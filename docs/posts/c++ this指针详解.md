# c++ this指针详解 #

## 一、什么是this指针？ ##

**官方解释**：

> 在C++中，`this` 指针是一个特殊的指针，它指向当前对象的地址。它是在类的成员函数中使用的，用于访问对象的成员变量和成员函数。每个非静态成员函数都有一个隐式的 `this` 指针，它指向调用该函数的对象的地址。这使得在成员函数中可以访问和操作对象的成员数据。

**示例**：

```c++
#include <iostream>

class MyClass {
public:
    int data;

    void setData(int value) {
        this->data = value; // 使用this指针来访问成员变量
    }

    void displayData() {
        std::cout << "Data: " << this->data << std::endl; // 使用this指针来访问成员变量
    }
};

int main() {
    MyClass obj1;
    MyClass obj2;

    obj1.setData(42);
    obj2.setData(17);

    obj1.displayData();
    obj2.displayData();

    return 0;
}

```

## 二、this指针存在的意义 ##

#### 1.解决名称冲突 ####

```c++
class MyClass {
public:
    int data; // 类的成员变量
    MyClass(int data) {
        // 使用 this 指针来访问类的成员变量
        this->data = data;
    }
};

int main() {
    MyClass obj(42);
    return 0;
}
```

这段代码中如果不使用``this->``,那么编译器会将``data = data``的运算结果返回为``true``而不会对在类中定义的变量data进行赋值操作。

使用this指针可以解决这个问题。this指针指向了Myclass构造函数所属的对象，也就是obj。谁调用成员函数，this指向谁。

#### 2.返回对象本身用*this ####

```c++
class MyClass {
public:
    MyClass(int value) : data(value) {}
    // 成员函数，返回对象本身
    MyClass& returnSelf() {
        // 使用this指针来返回对象本身
        return *this;
    }
    
private:
    int data;
};

int main() {
    MyClass obj(42);
    // 使用returnSelf()函数返回对象本身，并修改其值
    obj.returnSelf().display();  // 显示原始值
    obj.returnSelf().data = 99;  // 修改值
    return 0;
}
```

不做解释，记住就行。(**必须返回当前对象的引用！！！**)

可以链式调用``obj.returnSelf().returnSelf().returnSelf().returnSelf().data``

#### 3.在成员函数内部访问对象的成员（了解） ####

在成员函数内部，你可以使用 "this" 指针来访问对象的成员变量和其他成员函数，即使它们与参数或局部变量同名。

```c++
class MyClass {
public:
    int x;
    void printX() {
        std::cout << "x = " << this->x << std::endl;
    }
};
```

#### 4.访问正在构造或销毁的对象（了解） ####

在构造函数和析构函数中，使用 "this" 指针可以访问正在构造或销毁的对象，这对于执行特定的初始化和清理工作非常有用。

```c++
class MyClass {
public:
    int x;
    MyClass(int x) {
        this->x = x;
    }
    ~MyClass() {
        // 在析构函数中执行清理工作
    }
};
```

## 三、this指针的本质 ##

> 每个成员函数在被调用时都隐式传递了一个指向当前对象的 `this` 指针作为一个隐藏的形参。这个形参不需要显式传递，编译器会自动处理。
>
> 总之请记住，可以 `this` 视为成员函数的一个隐式形参
