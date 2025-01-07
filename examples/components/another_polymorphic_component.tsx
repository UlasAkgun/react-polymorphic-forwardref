import { forwardRefAs } from "../../src";

interface AnotherPolymorphicComponentProps {
    anotherText: string
}

export const AnotherPolymorphicComponent = forwardRefAs<'a', AnotherPolymorphicComponentProps>((props, ref) => {
    const {anotherText} = props

    return <div>{anotherText}</div>
})