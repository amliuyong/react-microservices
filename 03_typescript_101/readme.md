# Types

## Primitive Types
 - number
 - boolean
 - void 
 - undefined
 - string
 - symbol
 - null
  
## Object Types
- functions
- arrays
- classes
- objects

```typescript
import axios from "axios";

// http://jsonplaceholder.typicode.com/todos/1

const url = "http://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then((response) => {
  const todo = response.data as Todo;
  
  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
      id: ${id}
      title: ${title}
      completed?: ${completed}
    `);
};

```

```typescript

let nothingMuch: null = null;
let nothing: undefined = undefined;

// Array
let colors: string[] = ["red", "green"];
let myNumbers: number[] = [1, 3, 9];
let truths: boolean[] = [true, true, false];

// Class
class Car {}
let car: Car = new Car();

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// Function
const logNumber: (i: number) => void = (i) => {
  console.log(i);
};
  
```

# When to use annotations

```typescript
//1) Function that returns the 'any' type
const json = '{"name": "Yong", "age": 19}';
let myperson = JSON.parse(json) as { name: string; age: number };
console.log(myperson);

let myperson2: { name: string; age: number } = JSON.parse(json);
console.log(myperson2);

//2) When we declare a variable on one line
// and initalizate it later
const words = ["red", "green", "blue"];
let foundWord: string;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = words[i];
  }
}

//3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
```

# Functions

```typescript

const add1 = (a: number, b: number): number => {
  return a + b;
};

const add2: (a: number, b: number) => number = (a, b) => {
  return a + b;
};

const add3 = (a: number, b: number) => {
  return a + b;
};

function add4(a: number, b: number): number {
  return a + b;
}

const add5 = function (a: number, b: number): number {
  return a + b;
};

const loggger1 = (message: string): void => {
  console.log(message);
};
const loggger2 = (message: string): void => {
  console.log(message);
  return undefined;
};

const throwError = (message: string): never => {
  throw new Error(message);
};

const foreact = {
  date: new Date(),
  weather: "Sunny",
};

const logWeather1 = (foreact: { date: Date; weather: string }): void => {
  console.log(foreact.weather);
  console.log(foreact.date);
};

const logWeather2 = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(weather);
  console.log(date);
};

```

# Objects

```typescript

const profile = {
  name: "alex",
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age }: { age: number } = profile;
const { age : age1, name: name1 }: { age: number; name: string } = profile;

const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

```

# Arrays
```typescript
const carMakers = ["ford", "toyota", "chevy"];
const carMakers2: string[] = [];
const dates = [new Date(), new Date()];

const carsByMaker: string[][] = [["f150"], ["corolla"], ["camaro"]];

const car1 = carMakers.pop();

carMakers.map((car) => {
  return car.toUpperCase();
});

// Flexiable types
const importantDates: (Date | string)[] = [new Date(), "2020-12-31"];
```

# Tuples
`Tuple` is not useful in typescript

```typescript
const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40
};

const pepsi: [string, boolean, number] = ['brown', true, 40];

// type alias
type Drink = [string, boolean, number];
const pepsi2: Drink = ['brown', true, 40];

```
# Interfaces
```typescript

// Interfaces 

interface Reportable {
  summary(): string;
}

interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: 2000,
  broken: true,
  summary(): string {
    return `
      Name: ${this.name}
      Year:${this.year}
      broken: ${this.broken}
      `;
  },
};

const printVehicle = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`
    Name: ${vehicle.name}
    Year:${vehicle.year}
    broken: ${vehicle.broken}
    `);
};
printVehicle(oldCivic);

const printVehicle2 = (vehicle: Vehicle): void => {
  console.log(vehicle.summary());
};
printVehicle2(oldCivic);

const printVehicle3 = (vehicle: { summary(): string }): void => {
  console.log(vehicle.summary());
};
printVehicle3(oldCivic);

const printSmmary = (item: Reportable): void => {
  console.log(item.summary());
};
printSmmary(oldCivic);

const myDrink = {
  color: "brown",
  carbonated: true,
  summary(): string {
    return `color:${this.color} - carbonated: ${this.carbonated}`;
  },
};

printSmmary(myDrink);
```

# Classes

```typescript
// Classes

class Vehicle {
  color: string = "red";

  constructor(color?: string) {
    if (color) {
      this.color = color;
    }
  }
  drive(): void {
    console.log("chugga chugga");
  }
  protected honk(): void {
    console.log("beep");
  }
}

class VehicleEq {
  constructor(public color?: string) {}

  drive(): void {
    console.log("chugga chugga");
  }
  protected honk(): void {
    console.log("beep");
  }
}

class Car extends Vehicle {
  constructor(public wheels: number, color?: string) {
    super(color);
  }
  start(): void {
    this.honk();
  }
}

const vehicle = new Vehicle();
vehicle.drive();

const car = new Car(4);
car.drive();

const car2 = new VehicleEq("red");
car2.drive();
console.log(car2.color);



```
##  Abstract Class
https://github.com/amliuyong/react-microservices/tree/main/02_ticketing/common/src/errors

```typescript
// Abstract Class
abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // must set tsc: "target": "es2015",
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

```

# Add new property to existing Object

https://github.com/amliuyong/react-microservices/blob/main/02_ticketing/common/src/middlewares/current-user.ts

### add currentUser to Express.Request
```typescript
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
```

### add signin() to Global
https://github.com/amliuyong/react-microservices/blob/main/02_ticketing/auth/src/test/setup.ts

```typescript
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};

```

# Parcel in Action
```
npm install -g parcel-bundler

parcel index.html
```

 # Custom Google Map

```typescript

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new this.googleMap.maps.Map(
      document.getElementById("map"),
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  addMarker(mappable: Mappable): void {
    const marker = new this.googleMap.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infowindow = new this.googleMap.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infowindow.open(this.googleMap, marker);
    });
  }
}


```