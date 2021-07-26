import React from "react";

interface CourseNameProps {
    courseName: string;
}

const Header = ({ courseName }: CourseNameProps) => <div>{courseName}</div>

export default Header;