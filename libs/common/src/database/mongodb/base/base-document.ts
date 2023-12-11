import { Prop } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export class BaseDocument extends Document<Types.ObjectId> {
  @Prop({ default: null })
  deleted_at: Date
}
