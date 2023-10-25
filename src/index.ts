import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});














/*
4/0AfJohXkkdQwaPPS9rZ-PmEFxFlWNFs0BArvV2PGWWwSmffW75z1f9fJEXgZNUp_ONJCv3A
{
  access_token: 'ya29.a0AfB_byAcS70-ooLGAYMsRx-gYx4xxNa62DgAMmb8iSDZ5-u7H2YpHh9hcrpK2felR2KoeBpxdWYxnifDz0OUcXXERRGStR0z3a5rjMi4UHNiyJV3VmiCGnpqXPU6yiny7rHp_88eS1YaTYYs-ISLQ0ndAEOHT25GDbGFaCgYKATUSARISFQGOcNnCQdlHUHJIBAJaX5ejiKB47A0171',
  refresh_token: '1//0g0ZrAL0qG6o_CgYIARAAGBASNwF-L9Ir_c-0m-SuS52I3z457oS-E_k7bY3PDJOtUiXR_KESd9oGkVmxMVBqmymENtbBSEUK4gg',
  scope: 'https://www.googleapis.com/auth/calendar',
  token_type: 'Bearer',
  expiry_date: 1698265553652
}
*/
