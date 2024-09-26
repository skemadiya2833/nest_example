import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './assignment.entity';
import { Roles } from 'src/user/role.enum';
import { RolesIN } from 'src/guards/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Status } from './status.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('assignment')
@UseGuards(JwtAuthGuard)
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Post()
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN, Roles.MANAGER])
    @UseGuards(RolesGuard)
    async createAssignment(@Body() assignment: Assignment): Promise<Assignment> {
        return await this.assignmentService.create(assignment);
    }

    @Get()
    getAllAssignments(): Promise<Assignment[]> {
        return this.assignmentService.findAll();
    }

    @Get('/:id')
    getAssignmentByid(@Param('id') id: number): Promise<Assignment> {
        const assignment = this.assignmentService.findOne(id);
        if (assignment) return assignment;
        throw new NotFoundException("Record not Found");
    }

    @Put('/:id')
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN])
    @UseGuards(RolesGuard)
    updateAssignment(@Param('id') id: number, @Body() assignment: Assignment): void {
        this.assignmentService.update(id, assignment);
    }

    @Delete('/:id')
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN])
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: number): void {
        this.assignmentService.remove(id);
    }

    @Put('/:id/update')
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN, Roles.MANAGER])
    @UseGuards(RolesGuard)
    updateAssignAndStatus(@Param('id') id: number, @Body() assingment: Partial<Assignment>) {
        this.assignmentService.update(id, { assignedUser: assingment?.assignedUser, status: assingment?.status });
    }

    @Put('/:id/update')
    updateStatus(@Param('id') id: number, @Body() status: Status) {
        this.assignmentService.update(id, { status: status });
    }
}