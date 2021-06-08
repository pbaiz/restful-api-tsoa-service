import { ClientSchema } from './schemas/ClientSchema';
import mongoose from 'mongoose';
import { UserSchema } from '../db/schemas/UserSchema';
import { AdministratorSchema } from './schemas/AdministratorSchema';
import { ServiceSchema } from './schemas/ServiceSchema';
import { SessionSchema } from './schemas/SessionSchema';
import { InstructorSchema } from './schemas/InstructorSchema';
import { CalendarSchema} from './schemas/CalendarSchema';

export class MongoDbConnection {
  
  public static db: mongoose.Connection;
  private readonly connectionString: string = <string> process.env.MONGO_URI;

  constructor() {
    this.registerModels();
    this.connect();
  }

  private registerModels() {
    mongoose.model('users', UserSchema);
    mongoose.model('sessions', SessionSchema);
    mongoose.model('services', ServiceSchema);
    mongoose.model('administrator', AdministratorSchema);
    mongoose.model('clients', ClientSchema);
    mongoose.model('instructors', InstructorSchema);
    mongoose.model('calendar',CalendarSchema);
  }

  private connect() {
    mongoose.connect(this.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then();
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected!')
    });
    MongoDbConnection.db = mongoose.connection;
  }
}

