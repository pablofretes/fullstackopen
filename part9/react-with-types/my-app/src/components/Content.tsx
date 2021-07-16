import React from 'react'

interface ContentsProps {
    courseParts: Array<{name: string, exerciseCount: number}>
}

const Content = ({ courseParts }: ContentsProps) => <div>{courseParts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)}</div>

export default Content