import * as React from 'react'

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never
type Merge<A, B> = Omit<A, keyof B> & B
type DistributiveMerge<A, B> = DistributiveOmit<A, keyof B> & B
type IntrinsicElement<E> = E extends ForwardRefAsExoticComponent<infer T, any> ? T : E
type ExtendedProps<E, OwnProps> = E extends ForwardRefAsExoticComponent<any, infer P> ? Merge<P, OwnProps> : OwnProps

type PropsWithAs<
    Component extends React.ElementType,
    PermanentProps extends object,
    ComponentProps extends object,
> = DistributiveMerge<ComponentProps, PermanentProps & { as?: Component }>

export type ForwardRefAsComponentPropsWithRef<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | ForwardRefAsExoticComponent<any, any, any> = Default,
> = PropsWithAs<OnlyAs, ExtendedProps<Default, Props>, React.ComponentPropsWithRef<IntrinsicElement<OnlyAs>>>

export type ForwardRefAsComponentPropsWithoutRef<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | ForwardRefAsExoticComponent<any, any, any> = Default,
> = PropsWithAs<OnlyAs, ExtendedProps<Default, Props>, React.ComponentPropsWithoutRef<IntrinsicElement<OnlyAs>>>

export type ForwardRefAsComponentWithRef<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | ForwardRefAsExoticComponent<any, any, any> = React.ElementType,
> = <T extends OnlyAs | ForwardRefAsExoticComponent<any, any, any> = Default>(
    props: PropsWithAs<T, ExtendedProps<T, Props>, React.ComponentPropsWithRef<IntrinsicElement<T>>>
) => React.ReactElement | null

type ForwardRefAsExoticComponent<
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | ForwardRefAsExoticComponent<any, any, any> = React.ElementType,
> = Merge<React.ForwardRefExoticComponent<{}>, ForwardRefAsComponentWithRef<Default, Props, OnlyAs>>

export type ForwardRefAsFunction = <
    Default extends OnlyAs,
    Props extends object = {},
    OnlyAs extends React.ElementType | ForwardRefAsExoticComponent<any, any, any> = React.ElementType,
>(
    Component: React.ForwardRefRenderFunction<
        any,
        PropsWithAs<OnlyAs, Props, React.ComponentPropsWithRef<Default>>
    >
) => ForwardRefAsExoticComponent<Default, Props, OnlyAs>