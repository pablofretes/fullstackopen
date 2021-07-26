import React from 'react'
import { CoursePart } from '../index';
import Part from '../components/Part';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map(part => {
                return <Part key={part.name} part={part}/>
            })}
        </div>
    )
}

export default Content;