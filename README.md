# all-types

> All DefinitelyTyped typedefs, installed globally, for WebStorm & other JetBrains IDEs

## Motivation

I created this to be able to leverage [DefinitelyTyped](http://definitelytyped.org/)'s type definitions from within JetBrains' [WebStorm](https://www.jetbrains.com/webstorm/) (and other IDEs).  The presence of these typedefs provides better highlighting and code completion, *even if you're not using TypeScript!* 

*This tool will absolve you from actually adding `@types/whatever` as a development dependency to a non-TypeScript project.*

## Install

```sh
$ npm i -g all-types
```

Upon installation, three (3) things happen:

1.  The DefinitelyTyped [repo](https://github.com/DefinitelyTyped/DefinitelyTyped) will be cloned into a data directory.
2.  The working copy's `types/` dir will then be symlinked to your *global* `node_modules` directory as `@types`.
3.  The `update-types` executable will be installed globally.

## Post-Install Setup

### Webstorm & other JetBrains IDEs

To get this working, you need to add a new "JavaScript library" to your IDE.  These instructions will assume WebStorm.

1. Load a Node.js or JavaScript project.
2. Ensure the Node.js plugin is installed (it probably is).
3. Open **Preferences**.
4. Navigate to **Languages & Frameworks > JavaScript > Libraries**.  
    ![screenshot](https://cldup.com/kCR2jZOSsX.png)
5. Click **Add**:  
    ![screenshot](https://cldup.com/1JrQDSz3t2.png)
6. In the dialog, configure like so:  
    ![screenshot](https://cldup.com/Fs_pASpv4z.png)  
    1. Set **Name** to "types" or "all-types" (up to you).
    2. Set **Framework type** to **node_modules**.
    3. Set **Visibility** to **Global**.
7. Click the **+** as shown below, then select **Attach Directories...**.  
    ![screenshot](https://cldup.com/fxcB2GIvVN.png)  
8. In the file chooser, navigate to your global modules dir.

    > This is usually something like `/usr/local/lib/node_modules` or `/usr/lib/node_modules`.  You can print this by executing `npm config get prefix` then  appending `lib/node_modules` (or just `node_modules` if on Windows).  
    
    From this directory, navigate *into* the newly-symlinked `@types/` dir.
    
    > **Warning!** You *could* add the whole `@types/` dir, but I'd recommend just picking the ones you actually use.  I've had unexpected results when trying to load the whole thing (plus, indexing is slow); YMMV. 

    Now you should be in `/path/to/global/node_modules/@types/`.  You can select multiple directories; go ahead and command-click (or alt-click or whatever) on the packages you use.  For example, if you use `lodash` and `debug` often, pick both of these directories.
    
    > You will probably want to get types for the Node.js core modules--but you may not want *all* of them.  So, don't add `@types/node`; instead, add `@types/node/v6` or `@types/node/v4` depending on your version.  As of this writing, `v8` was not available, so I just chose `v7`.

    You don't have to choose them all now--you can go back and add more later!  Pick a handful.  When finished, click **OK**.
9. Now, you will need to tell WebStorm the "scope" of this library.  Click **Manage Scopes...**:  
    ![screenshot](https://cldup.com/SEwRMMAK4j.png)
10. Click on the first row, in the **Library** column.  You should see something like `<your-project>/nodemodules` already checked.  Find `all-types`, then select it.  
    ![screenshot](https://cldup.com/a79zWYevyt.png)
    > `all-types` will be whatever you named it, but `all-types/nodemodules` will be `<your-project>/nodemodules`; I just happened to take this screenshot from this project!
11. Click **OK**.  Then click **OK** again to apply & save your preferences.
12. To verify this worked, take a look at the **External libraries** in your project tree.  If it looks like this, you're set:  
    ![screenshot](https://cldup.com/bV47nLSlAf.png)
13. Enjoy better type inference and code completion!

Since you've installed this library as a *global* library, *repeat steps 9-12 for each other project* which wants to use the globally-installed types.

> I've yet to discover a way to get this working in WebStorm's **Default Settings**, so it is automatically enabled in a new project. 

### Updating the Types
The working copy tracks the `master` branch of DefinitelyTyped.  The DefinitelyTyped team publishes *All* packages within the `@types` scope from `master`, as far as I can tell.
  
To get any updates, execute `update-types` again; it'll pull down all of the latest changes, without cloning again from scratch.  

> Consider creating a cron or `launchd` job to update automatically. 

## Advanced Installation & Usage

### Default Working Copy Path

The default path of the DefinitelyTyped working copy is `/your/xdg-data-dir/all-types/DefinitelyTyped/`.  You can discover this path via the `--show-dir` flag:

```sh
$ update-types --show-dir
/Users/boneskull/.local/share/all-types/DefinitelyTyped
```

> See [xdg-basedir](https://npm.im/xdg-basedir) for more information.

### Custom Working Copy Path

To override the default path, you can specify the `--dir` option to `update-types`; the repo will then be cloned into the directory of your choosing.  To be clear, it won't create a `DefinitelyTyped/` subdirectory; the working copy root *will be at the path* you specify:

```sh
$ update-types --dir /tmp/foobar
Updating https://github.com/DefinitelyTyped/DefinitelyTyped.git at /tmp/foobar, please wait...
Up-to-date.
```

**However**, this will *not* remove the default working copy (as shown with `update-types --show-dir`)!

### Set Working Copy Path Globally

You can set the `ALL_TYPES_DIR` environment variable.  This will override the default path, but *not* any path specified with `-d/--dir`.

You can set this when installing, as well:

```sh
$ ALL_TYPES_DIR=/tmp/foobar npm i -g all-types
```

## Caveats

- **This package is not intended to work with TypeScript projects**.  This tool is for *non-TypeScript* projects which want to take advantage of the extra type information available from DefinitelyTyped.
- Be careful with typedefs corresponding to a version of a package you aren't using.  If you need older versions, you *may* need to manually manage the working copy, or use `npm install -D` (which we were trying to avoid). 

## License
© 2017 [Christopher Hiller](https://boneskull.com).  Licensed Apache-2.0.
