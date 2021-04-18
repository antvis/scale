import { Project, ScriptTarget, TypeAliasDeclaration, TypeChecker } from 'ts-morph';

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
});

// 配置根目录
project.addSourceFilesAtPaths('src/**/*{.d.ts,.ts}');

// 获得 ts 的检查器对象
const checker = project.getTypeChecker();

const getTypeAliasInfoByNode = (checker: TypeChecker, typeAliasDeclaration: TypeAliasDeclaration) => {
  const targetType = typeAliasDeclaration.getType();
  console.log(targetType.getText());
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
};

export const getOptionsPropsInfo = () => {
  // 获取所有的 type Alias
  const aliasInTypesExports = project.getSourceFile('scale-type.ts').getTypeAliases();

  return aliasInTypesExports
    .map((res) => getTypeAliasInfoByNode(checker, res))
    .filter((res) => res.name.includes('Options'));
};

getOptionsPropsInfo();
