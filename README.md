# react-polymorphic-forwardref

This package is heavily inspired by [react-polymorphed](https://github.com/nasheomirro/react-polymorphed) and addresses changes introduced in `TypeScript` version `5.x.x`.

In addition to supporting polymorphism with native HTML elements, it also enables polymorphing into existing polymorphic components.

- [Basic Usage](#basic-usage)
- [Automatically receive native HTML prop typings](#automatically-receive-native-html-prop-typings)
- [Polymorphing into Another Polymorphic Component](#polymorphing-into-another-polymorphic-component)

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
            as='button'
            text='Click me'
            onClick={(e) => alert('The type of "e" is automatically recognized as "React.MouseEvent<HTMLButtonElement, MouseEvent>"')}
        />
    );
}

App();
```

## Automatically receive native HTML prop typings

On the above example, `MyPolymorphicComponent` uses `div` element by default for render, inheriting all native HTML attributes for a `div`.

Let's consider `onClick` method and its typing. `onClick` method provides an `e` parameter, which is typed based on the HTML element it is assigned to. If the polymorped component is a `div` element,
then `Typescript` recognizes the default type of `e` as `React.MouseEvent<HTMLDivElement, MouseEvent>`.

```tsx
<MyPolymorphicComponent
    text='I am a "div" element'
    // "e" receives its typing automatically as "React.MouseEvent<HTMLDivElement, MouseEvent>"
    onClick={(e) => alert('"e" typing is "React.MouseEvent<HTMLDivElement, MouseEvent>"')}
/>

<MyPolymorphicComponent
    text='I am a "div" element'
    // ERROR: HTMLAnchorElement is not valid, since by default, it needs to be HTMLDivElement
    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => alert('Cannot define "e" as HTMLAnchorElement, I am a "div" element!')}
/>
```

Since this is a polymorphic component, its HTML element render can be modified based on where the component is consumed.

Let's say that we would like to polymorph this component into an Anchor (`a`) tag. We can accomplish this by simply providing the `as` prop to the component. Once we provide `as="a"`, we expect 2
things to happen:

- The `e` parameter of `onClick` should now be redefined based on the `HTMLAnchorElement`, effectively typing it as `React.MouseEvent<HTMLAnchorElement, MouseEvent>`.
- Native `HTMLAnchorElement` properties should be immediately available, such as `href` and `target`.

```tsx
<MyPolymorphicComponent
    as='a'
    text='I am an "a" element now'
    // Typescript will recognize the typings for "href" and "target"
    href="#"
    target="_blank"
    onClick={(e) => alert('Yeap, you guessed it right, "e" typing is "React.MouseEvent<HTMLAnchorElement, MouseEvent>"')}
/>
```

## Polymorphing into Another Polymorphic Component

What if we were polymorphing into another polymorphic component? In this case, the polymorphed component should inherit all the props of the polymorphed component, including the native properties of
the default `HTML element` and the explicitly defined props.

Let's build another polymorphic component, to be later polymorphed into `MyPolymorphicComponent`

```tsx
import { forwardRefAs } from 'react-polymorphic-forwardref'

interface AnotherPolymorphicComponentProps {
    anotherText: string
}

const AnotherPolymorphicComponent = forwardRefAs<'a', AnotherPolymorphicComponentProps>((props, ref) => {
    const {anotherText} = props

    return <div>{anotherText}</div>
})
```

If this component is rendered without polymorphing, it would automatically receive the `Anchor` element related native HTML props, as well as `anotherText` prop, which is required.

```tsx
<AnotherPolymorphicComponent
    // "anotherText" is an explicity defined prop
    anotherText='I am a prop of "AnotherPolymorphicComponent'
    // "e" typing will inherit the default HTML element of "AnotherPolymorphicComponent", which is an "a" tag.
    // Hence, its type will be "React.MouseEvent<HTMLAnchorElement, MouseEvent>"
    onClick={(e) => alert('"e" type is React.MouseEvent<HTMLAnchorElement, MouseEvent>')}
/>
```

Now let's polymorph `AnotherPolymorphicComponent` into `MyPolymorphicComponent`.

- `AnotherPolymorphicComponent` is going to inherit all the properties of `MyPolymorphicComponent`, including the `text` prop and the native HTML attributes for the default HTML element of
  `MyPolymorphicComponent`.
- `anotherText` prop that is required for `AnotherPolymorphicComponent` will be added on top of the inherited props.

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
