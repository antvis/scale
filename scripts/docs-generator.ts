import {
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  ProjectOptions,
  ScriptTarget,
  TypeAliasDeclaration,
  TypeChecker,
} from 'ts-morph';
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

  private getTypeAliasInfoByNode(checker: TypeChecker, typeAliasDeclaration: TypeAliasDeclaration) {
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

  private getOptionsAndPropsInfo() {
    // 获取所有的 type Alias
    const aliasInTypesExports = this.project.getSourceFile('types.ts').getTypeAliases();

    return aliasInTypesExports
      .map((res) => this.getTypeAliasInfoByNode(this.project.getTypeChecker(), res))
      .filter((res) => res.name.includes('Options'));
  }

  private getTotalClassesInfo() {
    const totalScaleSource = this.project
      .getDirectory('src/scales')
      .getSourceFiles()
      .filter((s) => s.getBaseName() !== 'base.ts');
    return totalScaleSource.map((cs) => {
      // 项目约定只有一个 class，我们可以放心地取下标 0
      const targetClass = cs.getClasses()[0];
      return {
        structure: targetClass.getStructure(),
        base: targetClass,
      };
    });
  }

  static formatComment(content: string) {
    // /** hello world */ -> hello world
    const matcher = content.match(/(\/\*\*)(.*)(\*\/)/);
    if (matcher && matcher.length === 4) {
      return matcher[2].trim();
    }
    return content;
  }

  static formatOptions(props: any[], defaults: string[]) {
    const dfs = defaults.map((res) => {
      const matchResults = res.match(/(.*): (.*)/).slice(1, 3);
      return {
        key: matchResults[0],
        value: matchResults[1],
      };
    });

    return props
      .map(
        (p) =>
          `| ${p.typeName} | ${DocsGenerator.formatComment(p.comment)} | <code>${p.typeContent.replace(
            '|',
            '丨'
          )}</code> | \`${dfs.find((d) => d.key === p.typeName)?.value}\` |`
      )
      .join('\n');
  }

  static getCommentByTag(tagName: string, docs: any[]) {
    if (!docs) {
      return '';
    }

    const res = docs.map((d) => {
      return d.tags.length ? d.tags.find((t) => t.tagName === tagName)?.text : '';
    });

    return res.join('\n');
  }

  static getParamsAndReturnInfoFormDocs(docs: any[]) {
    const ret = {
      name: 'void',
      value: '',
    };

    let params = [];

    if (docs.length) {
      params = docs[0].tags
        .filter((t) => t.tagName === 'param')
        .map((res) => {
          const matcher = (res.text as string).match(/(^\S*)(.*)/);
          return {
            name: matcher[1],
            value: matcher[2],
          };
        });
      const returns: string = docs[0].tags.filter((t) => t.tagName === 'return');
      if (returns.length) {
        const matcher = (returns[0] as any).text.match(/({(.*)?})(.*)/);
        if (matcher.length === 4) {
          // eslint-disable-next-line prefer-destructuring
          ret.name = matcher[2];
          // eslint-disable-next-line prefer-destructuring
          ret.value = matcher[3];
        }
      }
    }

    return {
      params,
      returns: ret,
    };
  }

  static formatType(str: string) {
    if (!str) {
      return '';
    }
    return str.replace('<', '&lt;').replace('>', '&gt;');
  }

  static getMethodInfo(methods: OptionalKind<MethodDeclarationStructure>[]) {
    const getParams = (params: OptionalKind<ParameterDeclarationStructure>[]) => {
      const pms = params.map((p) => `${p.name}: ${p.type}`);
      return pms.join(', ');
    };

    // 筛选出所有 public 的 methods
    const publicMethods = methods.filter((m) => m.scope === 'public');
    const res = publicMethods.map((m) => {
      const paramsAndReturnInfo = this.getParamsAndReturnInfoFormDocs(m.docs);

      return `**${m.name}(${this.formatType(getParams(m.parameters))})**
${m.docs.map((d: any) => d.description).join('\n')}

Parameters:

${paramsAndReturnInfo.params.map((res) => `${res.name} ${res.value}`).join('\n') || 'None'}

Return:

${paramsAndReturnInfo.returns.name} ${paramsAndReturnInfo.returns.value}
`;
    });

    return res.join('\n');
  }

  public generateMarkdown() {
    const cs = this.getTotalClassesInfo();
    const optionPropsInfo = this.getOptionsAndPropsInfo();
    const mdResults = cs.map((c) => {
      const { structure, base } = c;

      const defaults = base
        .getMethods()
        .find((m) => m.getName() === 'getOverrideDefaultOptions')
        .getReturnType()
        .getProperties()
        .map((res) => res.getValueDeclaration().getText());

      // 匹配对应的 Options
      const targetOptions = optionPropsInfo.find((optInfo) => optInfo.name === `${structure.name}Options`);
      const { props } = targetOptions;

      const md = `# ${structure.name}
${structure.docs.map((d: any) => d.description).join('\n')}

## Usage
${DocsGenerator.getCommentByTag('usage', structure.docs)}

## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
${DocsGenerator.formatOptions(props, defaults)}

## Methods

${DocsGenerator.getMethodInfo(structure.methods)}
`;

      return {
        mdContent: md,
        mdFileName: `${structure.name}.md`,
      };
    });

    mdResults.forEach((m) => {
      fs.writeFileSync(path.resolve(process.cwd(), 'docs', 'zh-CN', 'scales', m.mdFileName), m.mdContent);
    });
  }
}

new DocsGenerator().generateMarkdown();
