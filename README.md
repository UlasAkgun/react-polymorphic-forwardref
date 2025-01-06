# react-polymorphic-forwardref

This package is massively inspired by [react-polymorphed](https://github.com/nasheomirro/react-polymorphed). It handles the `typescript` version `5.x.x`, plus allows using already polymorphic
components for further polymorphism.

## Basic Usage

```tsx
import { forwardRefAs } from 'react-polymorphic-forwardref'

interface MyPolymorphicComponentProps {
    text: string
}

const MyPolymorphicComponent = forwardRefAs<'div', MyPolymorphicComponentProps>((props, ref) => {
    const {as, text} = props;

    const Component = as || 'div';

    return <Component ref={ref}>{text}</Component>;
});

export const App = () => {
    return (
        <MyPolymorphicComponent
            as={'button'}
            text='Click me'
            onClick={(e) => alert('The type of "e" is automatically recognized as "React.MouseEvent<HTMLButtonElement, MouseEvent>"')}
        />
    );
}

App();
```

## Use Cases

### Automatically receive native HTML prop typings

`MyPolymorphicComponent` is created as a `div` element by default. On the below example, `onClick` method's `e` parameter on the below example would recognize its default type as
`React.MouseEvent<HTMLDivElement, MouseEvent>`.

```tsx
<MyPolymorphicComponent
  text='Click me'
  // "e" receives its typing automatically as "React.MouseEvent<HTMLDivElement, MouseEvent>"
  onClick={(e) => {}}
/>
```

If `e` is tried to be typed anything different, we would get a compiler error. Try casting it to the `Anchor` element equivalent:

```tsx
<MyPolymorphicComponent
    text='Click me'
    // ERROR: HTMLAnchorElement is not valid, since by default, it needs to be HTMLDivElement
    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}}
/>
```

If `MyPolymorphicComponent` is polymorphed into a `button` element:

```tsx
<MyPolymorphicComponent
    as='button'
    text='Click me'
    // "e" receives its typing automatically as "React.MouseEvent<HTMLButtonElement, MouseEvent>"
    onClick={(e) => alert('My type is React.MouseEvent<HTMLButtonElement, MouseEvent>')}
/>
```

What about polymorphic into an `a` tag? `MyPolymorphicComponent` will automatically recognize `HTMLAnchorElement` related properties, such as `href` and `target`.

```tsx
<MyPolymorphicComponent
    as='a'
    text='I am a link now'
    // Typescript will recognize the typings for "href" and "target"
    href="#"
    target="_blank"
/>
```

### Polymorphing into Another Polymorphic Component

Let's build another polymorphic component, to be later polymorphed into `MyPolymorphicComponent`

```tsx
interface AnotherPolymorphicComponentProps {
    anotherText: string
}

const AnotherPolymorphicComponent = forwardRefAs<'a', AnotherPolymorphicComponentProps>((props, ref) => {
    const {anotherText} = props

    return <div>{anotherText}</div>
})
```

If we rendered this component by default:

```tsx
<AnotherPolymorphicComponent
    anotherText='I am a prop of "AnotherPolymorphicComponent'
    // "e" typing will inherit the default HTML element of "AnotherPolymorphicComponent", which is an "a" tag.
    // Hence, its type will be "React.MouseEvent<HTMLAnchorElement, MouseEvent>"
    onClick={(e) => alert('"e" type is React.MouseEvent<HTMLAnchorElement, MouseEvent>')}
/>
```

Let us polymorph this component into 'MyPolymorphicComponent'.

```tsx
<AnotherPolymorphicComponent
    as={MyPolymorphicComponent}
    // "text" prop is enherited, since it is a required prop of `MyPolymorphicComponent`
    text='I am a prop that is automatically inherited'
    anotherText='I am a prop of "AnotherPolymorphicComponent'
    // "e" typing will inherit the default HTML element of "MyPolymorphicComponent", which is a "div" tag.
    // Hence, its type will be "React.MouseEvent<HTMLDivElement, MouseEvent>"
    onClick={(e) => alert('"e" type is React.MouseEvent<HTMLDivElement, MouseEvent>')}
/>
```
