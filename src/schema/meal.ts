import S from 'jsonschema-definer';

const MealSchema = S.shape({
    id: S.string(),
    name: S.string(),
    durationInMinutes: S.number(),
    tags: S.list(S.string()),
});

export type Meal = typeof MealSchema.type;