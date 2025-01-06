import * as React from 'react'

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
type Merge<A, B> = Omit<A, keyof B> & B
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B
type IntrinsicElement<E> = E extends PolymorphicForwardRefComponent<infer T, any> ? T : E
type ExtendedProps<E, OwnProps> = E extends PolymorphicForwardRefComponent<any, infer P> ? Merge<P, OwnProps> : OwnProps

export type PropsWithAs<
    Component extends React.ElementType,
    PermanentProps extends object,
    ComponentProps extends object,
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>

export type ForwardRefAsProps<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | PolymorphicForwardRefComponent<any, any, any> = React.ElementType,
> = PropsWithAs<OnlyAs, ExtendedProps<Default, Props>, React.ComponentPropsWithRef<IntrinsicElement<OnlyAs>>>

export type PolymorphicComponentWithRef<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | PolymorphicForwardRefComponent<any, any, any> = React.ElementType,
> = <T extends OnlyAs | PolymorphicForwardRefComponent<any, any, any> = Default>(
    props: PropsWithAs<T, ExtendedProps<T, Props>, React.ComponentPropsWithRef<IntrinsicElement<T>>>
) => React.ReactElement | null

export type PolymorphicForwardRefComponent<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | PolymorphicForwardRefComponent<any, any, any> = React.ElementType,
> = Merge<React.ForwardRefExoticComponent<{}>, PolymorphicComponentWithRef<Default, Props, OnlyAs>>

export type PolymorphicForwardRefFunction = <
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | PolymorphicForwardRefComponent<any, any, any> = React.ElementType,
>(
    Component: React.ForwardRefRenderFunction<
        any,
        PropsWithAs<OnlyAs, Props, React.ComponentPropsWithRef<Default>>
    >
) => PolymorphicForwardRefComponent<Default, Props, OnlyAs>