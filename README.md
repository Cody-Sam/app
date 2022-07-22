# PC Builder 9001 React App

## Instructions

Clone this repo and run `npm i`
`npm run` will start the dev server
`npm test` will run the Vitest test suite

## Relevant Links

- [Testing Stats](https://cody-sam.github.io/app/coverage)
- [API Repository](https://github.com/cody-sam/api/)
- [Project Repository](https://github.com/cody-sam/T2A2)



## Application Patterns

### Resolved Paths

A small numbers of paths are resolved so they can be referenced without using relative paths. eg:
`import Card from 'components/card'` instead of  
`import Card from '../../components/card`

- `'components'` resolves to`'/src/components'`
- `'pages'` resolves to `'/src/pages'`
- `'modules'` resolves to `'/src/modules'`

### Page Functional Components Pattern

The automatic importing of a file named `index.jsx` is used to generate page objects that are used in `app.jsx`

all pages in a directory are imported into this file and collated into one object eg:

```js
import ShopIndex from "./ShopIndex";
import ShowItem from "./ShopItem";

function Shop() {
  return <ShopIndex />;
}
Shop.Index = ShopIndex;
Shop.Items = ShowItem;

export default Shop;
export { Index, Items };
```

This pattern is repeated to include all pages in the `/src/pages` directory so that all pages in the app can be imported with a single import call and destructured.

### Routes and protecting routes

The pattern used for routes is as follows

```js
<Router>
  <Routes>
    ...
    ...
    <Route path="/">
      <Route index element={<IndexPage />} />
      <Route path="subpage" element={<SubPage/>}>
    </Route>
    ...
    ...
  </Routes>
<Router>
```

To protect an individual or group of routes use the `<ProtectedRoute>` component

There are two variants of this component, nested in the same way as the pages components:

- `<ProtectedRoute.LoggedIn user={userStore.user} status={userStore.status} authRequired={[true/false]}/>`
  - authRequired = true - will redirect to login page if not logged in
  - authRequired = false - will redirect to user account page if already logged in
- `<ProtectedRoute.Admin user={userStore.user} status={userStore.status}/>`
  - will redirect a user to the last page if they do not have the admin role

To protect an individual route wrap the desired page component with the required protected route variant

```js
<Router>
  <Routes>
    ...
    ...
    <Route
      path="protected_page"
      element={
        <ProtectedRoute.LoggedIn>
          <Page />
        </ProtectedRoute.LoggedIn>
      }
    />
    ...
    ...
  </Routes>
<Router>
```

To protect a group of routes use the ProtectedRoute component as the element in the root route

```js
<Router>
  <Routes>
    ...
    ...
    <Route path="root" element={<ProtectedRoute.Admin />}>
      <Route index element={<AdminIndex />}>
      <Route path="another_page" element={<Admin.AnotherPage />}/>
    </Route>
    ...
    ...
  </Routes>
<Router>
```
