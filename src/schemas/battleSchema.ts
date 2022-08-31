import joi from 'joi';

const battleSchema:joi.ObjectSchema<string>= joi.object({
  "firstUser": joi.string().min(1).required(),
  "secondUser": joi.string().min(1).required()
});

export default battleSchema;