const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const height = 400
const width = 400
const radius = 190
const cx = height / 2
const cy = width / 2
const number_of_lines = 150
const unit_angle = 2 * Math.PI / number_of_lines
let multiplier = 2

const lines = _.map(_.range(number_of_lines), i => {
    return {start: unit_angle * i, end: unit_angle * i * multiplier}
})

function get_xy(theta) {
    return [Math.cos(theta) * radius + cx, Math.sin(theta) * radius + cy]
}

function recalculate_lines() {
    _.forEach(lines, line => {
        line.end = line.start * multiplier
    })
}

function draw() {
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    _.forEach(lines, line => {
        ctx.moveTo(...get_xy(line.start))
        ctx.lineTo(...get_xy(line.end))
    })
    ctx.stroke()
    multiplier += 0.01
    recalculate_lines()
    window.requestAnimationFrame(draw)
}

function init() {
    canvas.height = height
    canvas.width = width
    window.requestAnimationFrame(draw)
}

$(document).ready(function () {
    init()
})