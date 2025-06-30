import { GatewayTimeoutException, HttpException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export const handleHttpErrors = (error) => {


    if (error.message && error.message === 'Timeout has occurred') {
        throw new GatewayTimeoutException('El microservicio no respondió a tiempo');
    }

    let exception_info;
    let custom_error = error;
    if (error.error && error.error.status) {
        custom_error = error.error;
    }
    exception_info = { status: custom_error.status, message: custom_error.message }


    throw new HttpException(exception_info.message ?? 'Error', exception_info.status);



}