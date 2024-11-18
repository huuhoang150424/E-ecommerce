import { z } from "zod";



export const uploadProduct=z.object({

});


export type FormData=z.infer<typeof uploadProduct>;