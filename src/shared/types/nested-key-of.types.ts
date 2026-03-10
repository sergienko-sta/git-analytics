/**
 * Получает все возможные пути к свойствам объекта в виде строк с точками
 * @example
 * type Obj = { a: { b: { c: string } } }
 * type Keys = NestedKeyOf<Obj> // "a" | "a.b" | "a.b.c"
 */
export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];
