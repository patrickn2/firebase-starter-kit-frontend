type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
