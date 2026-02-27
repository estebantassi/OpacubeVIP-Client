declare module "secure-remote-password/client" {
  export type SRPEphemeral = {
    public: Buffer;
    secret: Buffer;
  };

  export type SRPSession = {
    key: Buffer;
    proof: Buffer;
  };

  export function generateSalt(): Buffer;

  export function generateEphemeral(): SRPEphemeral;

  export function derivePrivateKey(
    salt: Buffer,
    username: string,
    password: string
  ): Buffer;

  export function deriveVerifier(
    privateKey: Buffer
  ): Buffer;

  export function deriveSession(
    secret: Buffer,
    serverPublic: Buffer,
    salt: Buffer,
    username: string,
    privateKey: Buffer
  ): SRPSession;

  export function verifySession(
    clientPublic: Buffer,
    clientSession: SRPSession,
    serverProof: Buffer
  ): void;
}