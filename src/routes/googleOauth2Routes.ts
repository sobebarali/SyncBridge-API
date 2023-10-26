import expresss from 'express';
import { authUrlGenerate, tokenSet } from '../handlers/googleOauth2Handler';


const oauth2Router = expresss.Router();

oauth2Router.get("/oauth2", authUrlGenerate);
oauth2Router.get("/oauth2callback", tokenSet);

export default oauth2Router;