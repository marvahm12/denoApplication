import { Injectable, OAuth2Client, Status } from "../../deps.ts";
import UserService from "../user/user.service.ts";
import { CustomErrorHandler } from "../../middlewares/error.ts";
import { generateJwtToken } from "../../utils/helpers.ts";

@Injectable()
export default class AuthenticationService {
  oauth2Client: OAuth2Client;
  constructor(private readonly userService: UserService) {
    const { env } = Deno;
    this.oauth2Client = new OAuth2Client({
      clientId: env.get("CLIENTID") as string,
      clientSecret: env.get("CLIENTSECRET") as string,
      redirectUri: env.get("REDIRECTURI") as string,
      authorizationEndpointUri: env.get("AUTHORIZATIONENDPOINTURI") as string,
      tokenUri: env.get("TOKENURI") as string,
      defaults: {
        scope: "profile email openid",
      },
    });
  }

  getAuthUri() {
    const authorizationUrl = this.oauth2Client.code.getAuthorizationUri();
    return authorizationUrl;
  }

  async getGoogleCallBack(url: URL) {
    const tokens = await this.oauth2Client.code.getToken(url);
    // Use the access token to make an authenticated API request
    const userInfoUri = Deno.env.get("USERINFOURI") as string;
    const userResponse = await fetch(userInfoUri, {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    });
    const user = await userResponse.json();

    if (user && user.email) {
      const fetchedUser = await this.userService.getUser({ email: user.email });
      const token = await generateJwtToken(<string> fetchedUser.username);
      return { user: fetchedUser, token };
    }
    throw new CustomErrorHandler(Status.NotFound, "Google auth user not found");
  }
}
