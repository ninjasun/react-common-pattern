Composition
How components in React can be combined to work together.

We'll cover the following

Why Composition Seems like a Good Idea
Why it’s Not The Best Idea
Using React’s children API
Passing a child as a prop
Quick quiz on React Composition!
Why Composition Seems like a Good Idea #
One of the biggest benefits of React is composability. I personally don’t know of any other framework that offers such an easy way to create and combine components. In this section,​ we will explore a few composition techniques which proved to work well.

Let’s look at a simple example. Let’s say that we have an application with a header and we want to place navigation inside. We have three React components - App, Header and Navigation. They have to be nested into each other so we end up with the following dependencies:

<App> -> <Header> -> <Navigation>
The trivial approach for combining these components is to reference them in the places where we need them as we have done in previous lessons.

1234567891011121314151617181920
// app.js
import Header from './Header.js';

export default function App() {
  // 'App' referencing 'Header'
  return <Header />; 
}

// Header.js
import Navigation from './Navigation.js';

Why it’s Not The Best Idea #
However, by following this approach, we may encounter a couple of problems:

Dependencies: We may consider the App as a place where we do our main composition. The Header, however, may have other elements like a logo, search field or a slogan. What if we need the same Header component, but without the Navigation? We can’t easily achieve that because we have the two bound tightly together. It would, therefore, be nice if they could instead somehow be passed from the App component so we don’t create hard-coded dependencies.
It’s difficult to test: We may have some business logic in the Header and in order to test it, we have to create an instance of the component. However, because it imports other components we will probably create instances of those components too and it becomes difficult to test. Additionally, we could also end up breaking our Header test by doing something wrong in the Navigation component, which is misleading. (Note: to some extent shallow rendering solves this problem by rendering only the Header without its nested children.)
Using React’s children API #
In React we have the handy children prop. That’s how the parent reads/accesses its children. This API will make our Header agnostic and dependency-free:

12345
import React from 'react';

export default function Header({ children }) {
  return <header>{ children }</header>;
};

Run

Save

Reset
Notice also that if we don’t use { children } in Header, the Navigation component will never be rendered.

It now becomes easier to test because we may render the Header with an empty <div>. This will isolate the component and will let us focus on one piece of our application.

Passing a child as a prop #
Every React component receives props. As we mentioned already there is no strict rule about what these props are. We may even pass other components.

12345678910
import React from 'react';

export default function Header({ title, children }) {
  return (
    <header>
      { title }
      { children }
    </header>
  );
}

Run

Save

Reset
This technique is useful when a component like Header needs to take decisions about its children, but don’t bother about what they actually are. A simple example is a visibility component that hides its children based on a specific condition.