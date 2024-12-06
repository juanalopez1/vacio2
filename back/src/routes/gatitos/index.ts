import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { GatitoSchema, GatitoType } from "../../types/gatitos.js";
import { query } from "../../services/db.js";

const gatitosRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/all", {
    schema: {
      summary: "Listado de gatitos.",
      description: "Trae todos los gatitos",
      tags: ["Gatitos"],
      response: {
        200: {
          description: "Lista de gatitos completo.",
          content: {
            "application/json": {
              schema: Type.Array(GatitoSchema),
            },
          },
        },
      },
    },
    handler: async function (request, reply) {
      return (
        await query(`
            SELECT *
              FROM gatitos;
            `)
      ).rows as GatitoType[];
    },
  });

  fastify.post("/", {
    schema: {
      summary: "Crear un gatito",
      tags: ["Gatitos"],
      body: Type.Object({
        nombre: Type.String(),
        raza: Type.String(),
        fecha_nacimiento: Type.String(),
      }),
      response: {
        200: Type.Object({
          correct: Type.Boolean(),
        }),
      },
    },
    handler: async function (request, _reply) {
      const gatito = request.body as {
        nombre: string;
        raza: string;
        fecha_nacimiento: string;
      };
      const result = await query(
        `INSERT INTO gatitos(nombre, raza, fecha_nacimiento) values ($1, $2, $3) returning *;`,
        [gatito.nombre, gatito.raza, gatito.fecha_nacimiento]
      );

      if (result.rowCount === 1) {
        return { correct: true };
      }
    },
  });
};

export default gatitosRoutes;
