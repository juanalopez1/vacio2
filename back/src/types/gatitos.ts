import { Static, Type } from "@sinclair/typebox";

export const GatitoSchema = Type.Object(
    {
        nombre: Type.String({minLength: 1, maxLength:15}),
        raza: Type.String({minLength: 3, maxLength:15}),
        fecha_nacimiento: Type.String({minLength: 3, maxLength:15}),
    },
    {
        $id: "Gatito",
        title: "Gatito's schema"
    },
);


export const ErrorSchema = Type.Object(
    {
        errorMessage: Type.String(),
    },
    {
        title: "Error messages",
        $id: "errorMessage",
    },
);

export type GatitoType = Static<typeof GatitoSchema>;
export type ErrorType = Static<typeof ErrorSchema>;