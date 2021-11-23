What are Compound Components?
Compound components in React are components that are composed of two or more separate components.

We'll cover the following

Introduction
Example: select
Quick quiz!
Introduction #
The first pattern we will consider is called the Compound Components pattern. I know it sounds fancy, but I’ll break it down.

The keyword in the pattern’s name is the word Compound.

Literally, the word compound refers to something that is composed of two or more separate elements.

With respect to React components, this could mean a component that is composed of two or more separate components.

It doesn’t end there though.

Any React component can be composed of 2 or more separate components. So, that’s really not a good way to describe compound components.

With compound components, there’s more. The separate components within which the main component is composed cannot be used without the parent.

The main component is usually called the parent, and the separate composed components, children.

But if the children components are used without the outer parent components,
1 of 3







Example: select #
A classic example is the HTML select element.

12345
<select>
  <option value="value0">key0</option>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
</select>
An HTML example of a compound component
Here, the select element is the parent, and the option elements are children

This works like a compound component. For one, it no sense to use the <option>key0</option> element without a select parent tag. The overall behavior of a select element also relies on having these composed option elements as well. Hence, they are connected to one another.

The state of the entire component is managed by select with all child elements dependent on that state.

Do you get a sense of what compound components are now?

It is also worth mentioning that compound components are just one of many ways to express the API for your components.

For example, while it doesn’t look as good, the select element could have been designed to work like this:

1
<select options="key:value;anotherKey:anotherValue"></select>
A poor way that the select element could have been designed
This is definitely not the best way to express this API as it makes passing attributes to the child components almost impossible.

Quick quiz! #