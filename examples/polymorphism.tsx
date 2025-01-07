import { MyPolymorphicComponent } from './components/my_polymorphic_component';

const App = () => {
    return (
        <div>
            <MyPolymorphicComponent
                text='Click me'
                // "e" receives its typing automatically as "React.MouseEvent<HTMLDivElement, MouseEvent>"
                onClick={(e) => {
                }}
            />

            <MyPolymorphicComponent
                text='Click me'
                // ERROR: HTMLAnchorElement is not valid, since by default, it needs to be HTMLDivElement
                onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}}
            />

            <MyPolymorphicComponent
                as='button'
                text='Click me'
                // "e" receives its typing automatically as "React.MouseEvent<HTMLButtonElement, MouseEvent>"
                onClick={(e) => {
                }}
            />

            <MyPolymorphicComponent
                as='button'
                text='I am a link now'
                // ERROR: href is not a valid property
                href="#"
            />

            <MyPolymorphicComponent
                as='a'
                text='I am a link now'
                // Typescript will recognize the typings for "href" and "target"
                href="#"
                target="_blank"
            />
        </div>
    )
}

App.displayName = 'App'