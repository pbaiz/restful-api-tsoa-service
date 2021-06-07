import { SessionService } from './../services/SessionService';
import {
    Body,
    Controller,
    Delete,
    Post,
    Route,
    Query,
    Put
} from "tsoa";
import { ServiceService } from '../services/ServiceService';
import { GetParamsBody } from './utils';
import { Service } from '../model/Service';
import { UserService } from '../services/UserService';
import { User } from '../model/User';
import { GymSession } from '../model/GymSession';
import { RoomService } from '../services/RoomService';
import { Room } from '../model/Room';

/**
 * @description Request controller
 * The request handler to invoke the respective service
 */
@Route("api")
export class RequestController extends Controller {

    constructor(
        private sessionService: SessionService = new SessionService(),
        private serviceService: ServiceService = new ServiceService(),
        private userService   : UserService    = new UserService(),
        private roomService   : RoomService    = new RoomService()
    ) { super(); }

    // SESSIONS ---------------------------------------------------------------------------------
    @Post("sessions/get")
    public async getSessions(
        @Body() params: GetParamsBody
    ): Promise<any> {
        return await this.sessionService.get(params.filter, params.projection);
    }

    @Post("sessions/create")
    public async createSession(
        @Body() service: GymSession
    ): Promise<any> {
        return await this.sessionService.create(service);
    }

    @Delete("sessions/delete")
    public async deleteSession(
        @Query() sessionId : string
    ): Promise<any> {
        return await this.sessionService.delete(sessionId);
    }

    @Put("sessions/update")
    public async updateSession(
        @Body() session: { sessionId : string, updatedSession: GymSession }
    ): Promise<any> {
        return await this.serviceService.modify(session.sessionId, session.updatedSession);
    }

    // SERVICES ---------------------------------------------------------------------------------
    @Post("services/get")
    public async getServices(
        @Body() params: GetParamsBody
    ): Promise<any> {
        return await this.serviceService.get(params.filter, params.projection);
    }

    @Post("services/create")
    public async createService(
        @Body() service: Service
    ): Promise<any> {
        return await this.serviceService.create(service);
    }

    @Put("services/update")
    public async updateService(
        @Body() service: { serviceId : string, updatedService: Service }
    ): Promise<any> {
        return await this.serviceService.modify(service.serviceId, service.updatedService);
    }

    @Delete("services/delete")
    public async deleteService(
        @Query() serviceId: string
    ): Promise<any> {
        return await this.serviceService.delete(serviceId);
    }

    // USERS ---------------------------------------------------------------------------------
    @Post("users/get")
    public async getUsers(
        @Body() params: GetParamsBody
    ): Promise<any> {
        return await this.userService.get(params.filter, params.projection);
    }

    @Put("users/update")
    public async updateUser(
        @Body() service: { serviceId : string, updatedUser: User }
    ): Promise<any> {
        return await this.userService.modify(service.serviceId, service.updatedUser);
    }

    @Post("users/create")
    public async createUser(
        @Body() user: User
    ): Promise<any> {
        return await this.userService.create(user);
    }

    @Delete("users/delete")
    public async deleteSUser(
        @Query() userId: string
    ): Promise<any> {
        return await this.userService.delete(userId);
    }

    // ROOMS ---------------------------------------------------------------------------------------

    @Post("rooms/get")
    public async getRooms(
        @Body() params: GetParamsBody
    ): Promise<any> {
        return await this.roomService.get(params.filter, params.projection);
    }

    @Put("rooms/update")
    public async updateRoom(
        @Body() room: { roomId : string, updatedRoom: Room }
    ): Promise<any> {
        return await this.roomService.modify(room.roomId, room.updatedRoom);
    }

    @Post("rooms/create")
    public async createRoom(
        @Body() room: Room
    ): Promise<any> {
        return await this.roomService.create(room);
    }

    @Delete("rooms/delete")
    public async deleteRoom(
        @Query() roomId: string
    ): Promise<any> {
        return await this.roomService.delete(roomId);
    }
}