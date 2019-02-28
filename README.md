# Add C++ Class
VS Code extension to add a header and source file for a new C++ class.

## Features
Adds an "Add C++ class" context menu item to folders in the workspace explorer. Selecting the item will prompt you to enter a 
name for the .h and .cpp files then prompt you to enter a name for the class. Class names may be prefixed with a namespace 
(e.g. `mynamespace::MyClass`), which will cause the class to be generated inside of the given namespace. The generated class
will have no members aside from a `default`ed public constructor.
