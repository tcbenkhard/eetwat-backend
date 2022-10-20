import S from 'jsonschema-definer';

const MealSchema = S.shape({
    id: S.string(),
    name: S.string(),
    tags: S.list(S.string()),
});

export type Meal = typeof MealSchema.type;