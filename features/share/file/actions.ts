"use server";

import { fileShareService } from "@/services/share-service";
import { shareAction } from "../common/actions";
import { FileShareActionSchema } from "./validations";

export const fileShareAction = shareAction(FileShareActionSchema, fileShareService)