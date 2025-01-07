import { MyPolymorphicComponent } from './components/my_polymorphic_component';
import { AnotherPolymorphicComponent } from './components/another_polymorphic_component';


const App = () => {
    return (
        <div>
            <AnotherPolymorphicComponent
                anotherText='I am a prop of "AnotherPolymorphicComponent'
                // "e" typing will inherit the default HTML element of "AnotherPolymorphicComponent", which is an "a" tag.
                // Hence its type will be "React.MouseEvent<HTMLAnchorElement, MouseEvent>"
                onClick={(e) => alert('"e" type is React.MouseEvent<HTMLAnchorElement, MouseEvent>')}
            />

            <AnotherPolymorphicComponent
                as={MyPolymorphicComponent}
                // "text" prop is enherited, since it is a required prop of `MyPolymorphicComponent`
                text='I am a prop that is automatically inherited'
                anotherText='I am a prop of "AnotherPolymorphicComponent'
                // "e" typing will inherit the default HTML element of "MyPolymorphicComponent", which is a "div" tag.
                // Hence its type will be "React.MouseEvent<HTMLDivElement, MouseEvent>"
                onClick={(e) => alert('"e" type is React.MouseEvent<HTMLDivElement, MouseEvent>')}
            />
        </div>
    )
}

App.displayName = 'App'