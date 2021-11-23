import {
  map,
  multiply,
  view,
  lensProp,
  set,
  lensPath,
  lensIndex,
  prop,
  assoc
} from 'ramda'

let name, result, person

const Identity = x => ({
  value: x,
  map: fn => Identity(fn(x))
})

name = Identity('Bobo')

console.log(name)

const newName = name.map(value => value.toUpperCase())
/** usa la map del functore, che prende come param un fn e gli passa la fn anonima value.toUpperCase() che ritorna un nuovo funtore che ha per value il return della funzione eseguita .toUpperCase() */
console.log({ name, newName })

//And since map must return the same type, we can chain it similar to array’s map.

const nameee = Identity('Bobo')
const newNameee = name
  .map(value => value.slice(0, 3))
  .map(value => `My name is not ${value}!`)
  .map(value => value.toUpperCase())

console.log({ nameee, newNameee })

/**
 * This way is immutable, easier to read, and composes better.

And when you need to extract it, just access its .value property.
 */

// value to read, and map to set

/**** WHY? LENSES uses functor */

let functor = {
  value: 10,
  'fantasy-land/map': () => 'You have been overridden!'
}

result = map(multiply(2), functor)

console.log({ result })
//Notice map ignored multiply(2) and went straight to the override function. This is because it looks out for functors with the fantasy-land/map method.

//Defining this method means “Give me full control of the mapping function”. Whatever it returns will be used.
/**
 * Summary #
Ramda’s map works with arrays, objects, and strings.
Functors with a fantasy-land/map method can override map and return whatever.
Who Cares? #
The next topic, lenses, employ this strategy to a great extent. Without map's override capabilities, lenses would need a big refactoring.
 */

/************   LENSES ****  ZOOM IN ********************/

// method GET
person = {
  firstName: 'Bobo',
  lastName: 'Flakes'
}

let fNameLens = lensProp('firstName')
result = view(fNameLens, person)

console.log({ result })

// method SET

fNameLens = lensProp('firstName')
const res = set(fNameLens, 'Bobo Jr.', person)

console.log({ person })
console.log({ res })

/*****  MERGING IMMUTABLES OBJECTS *****************/
//Nested Properties
//Lenses are great for safely changing nested properties without a ton of merging code.

//example
person = {
  firstName: 'Bobo',
  lastName: 'Flakes',
  company: 'Fake Inc.',
  position: {
    title: 'Front-End Developer',
    department: {
      name: 'Product',
      departmentManager: {
        firstName: 'Bobo Sr.',
        lastName: 'Flax'
      }
    }
  }
}

let correctPerson = {
  ...person,
  position: {
    ...person.position,
    department: {
      ...person.position.department,
      departmentManager: {
        ...person.position.department.departmentManager,
        lastName: 'Flakes'
      }
    }
  }
}

let correctedLastName =
  correctPerson.position.department.departmentManager.lastName

console.log({ correctedLastName })

/**** with lens */
person = {
  firstName: 'Bobo',
  lastName: 'Flakes',
  company: 'Fake Inc.',
  position: {
    title: 'Front-End Developer',
    department: {
      name: 'Product',
      departmentManager: {
        firstName: 'Bobo Sr.',
        lastName: 'Flax'
      }
    }
  }
}

let managerLastNameLens = lensPath([
  'position',
  'department',
  'departmentManager',
  'lastName'
])

correctPerson = set(managerLastNameLens, 'Flakes', person)
correctedLastName = view(managerLastNameLens, correctPerson)

console.log({ correctedLastName })

/***********************************   VIEW AND UPDATE AND SAME because is CURRYED *******************************/
//Much cleaner. One bonus is that since it’s curried, a single lens can be used to view and update a property. We used managerLastNameLens in both set and view.

//array lensIndex

person = {
  firstName: 'Bobo',
  lastName: 'Flakes',
  friends: [
    {
      firstName: 'Clark',
      lastName: 'Kent'
    },
    {
      firstName: 'Bruce',
      lastName: 'Wayne'
    },
    {
      firstName: 'Barry',
      lastName: 'Allen'
    }
  ]
}

let getThirdFriend = lensIndex(2)
result = view(getThirdFriend, person.friends)

console.log({ result })

/**********   GET and SET of lens longhead ***********/
person = { name: 'Bobo' }
name = prop('name', person)

let personWithAge = assoc('age', 25, person)

console.log({ person, personWithAge })
console.log({ name })
//And since lenses need a getter and a setter to perform their duties, prop and assoc make the perfect combination to immutably handle and change lenses.

/***************************  lens implementation **********************************/
let _curry2 = () => {}
var lens = _curry2(function lens (getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target)
      }, toFunctorFn(getter(target)))
    }
  }
})

/***
 * curry note
 * Ramda’s curry is dynamic, and handles all types of functions with differing argument counts.

If you know how many arguments you need, however, using a specialized curry can optimize your function’s run-time
 */
