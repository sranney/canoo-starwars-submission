/**
 * we don't need defaultValues for our particular contexts
 * however, by providing no value or undefined to createContext, and stating that the return type is either a particular shape or undefined
 * results in TypeScript guarding against trying to destructure data from a particular context when using useContext
 * a common pattern I have seen both in https://kentcdodds.com/blog/how-to-use-react-context-effectively and in https://frontendmasters.com/workshops/react-typescript-v2/#player
 * is creating a custom useContext hook which bakes into it a typeguard to check the value of the context for undefined.
 * This narrowing makes TypeScript feel all warm and fuzzy that the value that it will be getting from useContext will actually be something that it can destructure from.
 * Encapsulating all of this code into a custom createContext function gives us additional benefit of not having to pass the context information in ourselves. We get that baked into the useContext which is output from the custom createContext
*/

import React from "react"

export const createContext = <T extends {}>() => {
    const context = React.createContext<T | undefined>(undefined)

    const useContext = () => {
        // returning this function which uses the context which was created above creates a closure, allowing us to use this particular useContext always with the correct context already baked into it
        const ctx = React.useContext(context);
        if(!ctx) {
            // this will alert user of improper use and will exit the function
            throw new Error('useContext must be used from within a context provider');
        }
        // now we have confidence that ctx will not be undefined
        return ctx;
    }

    // we need this to be a tuple, and for typescript not to misinterpret the return here to mean that the type is an array of items of either () => T or React.Provider<T | undefined>
    // so all we need to do is cast this as a const
    return [useContext, context.Provider] as const
}