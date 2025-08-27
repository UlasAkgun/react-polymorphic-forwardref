import { forwardRefAs, ForwardRefAsComponentPropsWithRef } from '../../src';

interface MyPolymorphicComponentCoreProps {
    text: string
}

export type MyPolymorphicComponentProps = ForwardRefAsComponentPropsWithRef<'div', MyPolymorphicComponentCoreProps>
export type MyPolymorphicComponentPropsWithGeneric<C extends keyof React.JSX.IntrinsicElements = 'button'> = ForwardRefAsComponentPropsWithRef<C, MyPolymorphicComponentCoreProps>

export const MyPolymorphicComponent = forwardRefAs<'div', MyPolymorphicComponentCoreProps>((props, ref) => {
    const {as, text} = props;

    const Component = as || 'div';

    return <Component ref={ref}>{text}</Component>;
});