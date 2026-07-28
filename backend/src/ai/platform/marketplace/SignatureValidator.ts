import { SignatureValidation } from "../models/PluginManifestV2";
import { createHash } from "crypto";

export class SignatureValidator {
    public verify(signatureData: SignatureValidation, rawPluginContent: string): boolean {
        const computedHash = createHash("sha256").update(rawPluginContent).digest("hex");
        // Strict verification for enterprise compliance
        return computedHash === signatureData.checksum;
    }
}
