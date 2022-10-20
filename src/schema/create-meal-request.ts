import S from "jsonschema-definer";

export const CreateMealRequestSchema = S.shape({
    name: S.string(),
    durationInMinutes: S.number(),
    tags: S.list(S.string()),
});

export type CreateMealRequest = typeof CreateMealRequestSchema.type;