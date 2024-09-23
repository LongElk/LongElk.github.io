# C++ 类中在sort方法中调用cmp 编译报错：invalid use of non-static member function #

## **一、报错的可能情况** ##

1.**试图在静态上下文中使用非静态成员函数**：静态成员函数属于类，而不是类的实例。如果你在静态成员函数内部尝试访问非静态成员函数，编译器会报错。例如：

```cpp
class MyClass {
public:
    void nonStaticFunction() {
        // 非静态成员函数
    }

    static void staticFunction() {
        // 静态成员函数
        nonStaticFunction(); // 这里会导致 "invalid use of non-static member function" 错误
    }
};
```

2.**在没有创建对象实例的情况下尝试调用非静态成员函数**：非静态成员函数通常是特定对象的一部分，因此你需要创建一个对象实例才能调用它。如果尝试在没有创建对象实例的情况下调用非静态成员函数，编译器会报错。例如：

```cpp
MyClass::nonStaticFunction(); // 这里会导致 "invalid use of non-static member function" 错误
```

3.**通过指针或引用尝试调用非静态成员函数而未提供对象**：如果你有一个指向对象的指针或引用，并尝试通过它来调用非静态成员函数，你必须确保指针或引用引用的对象存在。如果没有提供对象，编译器会报错。例如：

```cpp
MyClass* ptr = nullptr;
ptr->nonStaticFunction(); // 这里会导致 "invalid use of non-static member function" 错误
```

## **二、理论解释** ##

#### static成员和非static成员有什么区别？

> 1.**静态成员属于类本身,非静态成员属于类的对象实例**
>
> ​	静态成员是<u>与类本身绑定</u>的,它不依赖于任何对象实例。即使没有任何对象被创建,静态成员也存在。
>
> ​	非静态成员必须通过对象实例才能访问,它<u>与特定对象实例绑定</u>。
>
> 2.**静态成员在程序加载类时分配内存,非静态成员在创建对象时分配内存**
>
> ​	静态成员的内存只分配一次,在<u>加载类</u>时就完成了。
>
> ​	非静态成员的内存是在每次<u>创建对象</u>时分配的。
>
> 3.**静态成员通过类名直接访问,非静态成员通过对象访问**
>
> 例如：
>
> ```cpp
> class Example {
>   public:
>     static int val;
>     
>     int x; 
> };
> 
> // 静态成员访问
> Example::val = 1; 
> 
> // 非静态成员访问  
> Example obj;
> obj.x = 2;

#### 一个重要特性：静态成员函数不存在this指针 ####

this指针是每个非静态成员函数特有的指针,指向调用该函数的<mark>对象实例</mark>。但是静态函数<mark>不依赖</mark>任何对象实例,所以也就没有this指针。

例如:

```c++
class Example {
  public:
    static void foo() {
      // 没有this指针
    }
    
    void bar() {
      // 有this指针,指向调用对象
    }
};
```

由于没有this指针,静态函数内部无法直接访问非静态数据成员和函数,包括:

- 非静态数据成员(需要通过对象访问)
- 非静态成员函数(需要通过对象调用)

但是静态函数可以通过传入对象参数,来间接访问非静态成员:
```c++
class Example {
  int x;
  
  static void func(Example obj) {
    // 通过obj访问x
    obj.x = 1;
  }
}
```

## 三、为什么报错？

报错代码：

```c++
class MyClass {
public:
    int value;

    MyClass(int val) : value(val) {}

    bool cmp(const MyClass& other) {
        return value < other.value;
    }
};

int main() {
    vector<MyClass> vec = {3, 1, 2};

    sort(vec.begin(), vec.end(), MyClass::cmp); // 这里会报错

    for (const MyClass& item : vec) {cout << item.value << " ";}
    return 0;
}
```

我定义了一个非静态成员函数`cmp`，通过接收`MyClass`对象，实现vec的比较。但由于非静态成员需要传入对象的实例而非对象本身，而我并未创建一个类的实例，而仅仅将vec当做实例传入，`cmp`找不到传入对象的this指针，所以无法对vec进行对象操作。

## 四、解决方案 ##

#### 1. 使用静态函数 ####

使用静态函数可以实现无需实例进行比较

```c++
class MyClass {
public:
    int value;

    MyClass(int val) : value(val) {}

    static bool cmp(const MyClass& other) {
        return value < other.value;
    }
};
```

#### 2. 使用全局函数 ####

全局函数的作用域为代码全局，不局限于特定的作用域，不依赖与特定的代码实例，但缺点是无法封装在类中，无法做到oop编程。

```c++
class MyClass {
public:
    int value;

    MyClass(int val) : value(val) {}
};

bool cmp(const MyClass& a, const MyClass& b) {
    return a.value < b.value;
}
```

#### 3. 使用lambda函数 ####

C++11及更高版本支持lambda函数，lambda函数有很多好处，比如上下文感知，函数内联，增强可读性， 避免全局命名污染等。但缺点同样明显，就是无法封装到特定的`cmp`函数中，如果代码量大的情况下，需要在不同情况比较需要重复写，很麻烦。

```c++
sort(vec.begin(), vec.end(), [](const MyClass& a, const MyClass& b) {
        return a.value < b.value;
    });
```

#### 4. std::bind ####

`bind`是C++标准库中的一个函数，它用于创建可调用对象，将函数的参数部分应用，并为函数提供绑定的参数。`bind`函数可以帮助你创建一个新的可调用对象，该对象包含了原始函数的部分参数，从而在稍后的调用中传递剩余的参数。

`bind`函数的一般用法如下：

```c++
#include <functional> // 需要包含头文件

// 原始函数或函数对象
ReturnType myFunction(ParamType1, ParamType2, ...);

// 使用bind创建可调用对象
auto boundFunc = bind(myFunction, arg1, arg2, ...);
```

1. `myFunction`：原始函数或函数对象，它是你要创建可调用对象的函数。
2. `boundFunc`：通过`bind`创建的可调用对象。这个对象可以像原始函数一样被调用。
3. `arg1, arg2, ...`：用于部分应用的参数。这些参数可以是实际的值，也可以是占位符，如`placeholders::_1`，用于稍后传递。
4. 返回值类型 `ReturnType`：`bind`返回的可调用对象的返回类型与原始函数的返回类型相同。
5. 参数类型 `ParamType1, ParamType2, ...`：原始函数的参数类型。

解决方法：

```c++
sort(vec.begin(), vec.end(), bind(&MyClass::cmp, placeholders::_1, placeholders::_2, ascending));
```

不建议使用bind，建议用lambda替换bind