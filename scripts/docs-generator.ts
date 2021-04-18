import { Project, ProjectOptions, ScriptTarget, TypeAliasDeclaration, TypeChecker } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

class DocsGenerator {
  static COMPILER_OPTIONS: ProjectOptions = {
    compilerOptions: {
      target: ScriptTarget.ESNext,
    },
  };

  static BASE_PATH_GLOBS = 'src/**/*{.d.ts,.ts}';

  private project: Project;

  constructor() {
    // 初始化 ts project 环境
    this.project = new Project(DocsGenerator.COMPILER_OPTIONS);

    // 添加项目的源文件
    this.project.addSourceFilesAtPaths(DocsGenerator.BASE_PATH_GLOBS);
  }

  getTypeAliasInfoByNode(checker: TypeChecker, typeAliasDeclaration: TypeAliasDeclaration) {
    const targetType = typeAliasDeclaration.getType();
    const typeProperties = targetType.getProperties();
    const propsInfo = typeProperties.map((t) => {
      const getPropInfo = () => {
        // 没有注入泛型的类型
        const plainType = t.getValueDeclaration()?.getType();
        // 获取声明
        const commentRanges = t.getDeclarations().map((res) => res.getLeadingCommentRanges());
        return {
          comment: commentRanges.map((res) => res.map((res) => res.getText()).join('\n')).join('\n'),
          typeName: t.getName(),
          typeContent: checker.getTypeOfSymbolAtLocation(t, typeAliasDeclaration).getText(),
          plainTypeContent: plainType ? plainType.getText() : undefined,
        };
      };
      return getPropInfo();
    });
    return {
      props: propsInfo,
      name: typeAliasDeclaration.getName(),
    };
  }

  public getOptionsAndPropsInfo() {
    // 获取所有的 type Alias
    const aliasInTypesExports = this.project.getSourceFile('types.ts').getTypeAliases();

    return aliasInTypesExports
      .map((res) => this.getTypeAliasInfoByNode(this.project.getTypeChecker(), res))
      .filter((res) => res.name.includes('Options'));
  }

  public getTotalClassesInfo() {
    const totalScaleSource = this.project
      .getDirectory('src/scales')
      .getSourceFiles()
      .filter((s) => s.getBaseName() !== 'base.ts');
    return totalScaleSource.map((cs) => {
      // 项目约定只有一个 class，我们可以放心地取下标 0
      const targetClass = cs.getClasses()[0];

      return targetClass.getStructure();
    });
  }

  public generateMarkdown() {
    const cs = this.getTotalClassesInfo();
    const optionPropsInfo = this.getOptionsAndPropsInfo();
    const mdResults = cs.map((c) => {
      // 匹配对应的 Options
      const targetOptions = optionPropsInfo.find((optInfo) => optInfo.name === `${c.name}Options`);
      const { props } = targetOptions;

      const md = `# ${c.name}
${c.docs.map((d: any) => d.description).join('\n')}

## Usage
TODO

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
${props
  .map((p) => `| ${p.typeName} | ${p.comment} | <code>${p.typeContent.replace('|', '丨')}</code> | \`[]\` |`)
  .join('\n')}`;

      return {
        mdContent: md,
        mdFileName: `${c.name}.md`,
      };
    });

    mdResults.forEach((m) => {
      fs.writeFileSync(path.resolve(process.cwd(), 'docs', 'zh-CN', 'scales', m.mdFileName), m.mdContent);
    });
  }
}

new DocsGenerator().generateMarkdown();
