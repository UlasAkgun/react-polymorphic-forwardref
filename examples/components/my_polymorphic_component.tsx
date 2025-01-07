import { forwardRefAs } from '../../src';

interface MyPolymorphicComponentProps {
    text: string
}

export const MyPolymorphicComponent = forwardRefAs<'div', MyPolymorphicComponentProps>((props, ref) => {
    const {as, text} = props;

    const Component = as || 'div';

    return <Component ref={ref}>{text}</Component>;
});