import { NonIndexRouteObject } from "react-router-dom"

export type ComponentLoader = React.LazyExoticComponent<() => JSX.Element> & {
  loader:  NonIndexRouteObject["loader"]
}

export type ZodError = Record<string, string>