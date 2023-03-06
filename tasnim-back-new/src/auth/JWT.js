const path = require('path');
const { readFile } = require('fs');
const { promisify } = require('util');
const { sign, verify } = require('jsonwebtoken');
const { InternalError, BadTokenError, TokenExpiredError } = require('../core/ErrorHandler');
const Logger = require('../core/Logger');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

/*
 * issuer 		— Software organization who issues the token.
 * subject 		— Intended user of the token.
 * audience 	— Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm 	— Encryption algorithm to be used to protect the token.
 */

class JWT {
    static readPublicKey() {
        return promisify(readFile)(path.join(__dirname, '../../keys/public.pem'), 'utf8');
    }

    static readPrivateKey() {
        return promisify(readFile)(path.join(__dirname, '../../keys/private.pem'), 'utf8');
    }

    static async encode(payload) {
        const cert = await this.readPrivateKey();
        if (!cert) throw new InternalError('TokenGenerationFailure');
        // @ts-ignore
        return promisify(sign)({ ...payload }, cert, { algorithm: 'RS256' });
    }

    /**
     * This method checks the token and returns the decoded data when token is valid in all respect
     */
    static async validate(token,req) {
        const cert = await this.readPublicKey();
        try {
            // @ts-ignore
            return (await promisify(verify)(token, cert));
        } catch (e) {
            // Logger.debug(e);
            if (e && e.name === 'TokenExpiredError') throw new TokenExpiredError('TokenIsExpired');
            // throws error if the token has not been encrypted by the private key
            throw new BadTokenError();
        }
    }

    /**
     * Returns the decoded payload if the signature is valid even if it is expired
     */
    static async decode(token,req) {
        const cert = await this.readPublicKey();
        try {
            // @ts-ignore
            return (await promisify(verify)(token, cert, { ignoreExpiration: true }));
        } catch (e) {
            Logger.debug(e);
            throw new BadTokenError();
        }
    }
}

class JwtPayload {

    constructor(issuer, audience, subject, param, validity) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity * 24 * 60 * 60;
        this.prm = param;
    }
}

module.exports = { JWT, JwtPayload }
