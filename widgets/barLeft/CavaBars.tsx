import Gtk from "gi://Gtk?version=4.0"

import { cava } from "../../services/cava"

interface CavaBarsProps {
    width?: number
    height?: number
}

export default function CavaBars({
    width = 100,
    height = 20,
}: CavaBarsProps) {
    return (
        <drawingarea
            widthRequest={width}
            heightRequest={height}
            $={(area: Gtk.DrawingArea) => {

                const dispose = cava.subscribe(() => {
                    area.queue_draw()
                })

                area.connect("destroy", dispose)

                area.set_draw_func((_area, cr, width, height) => {

                    const samples = cava()

                    if (samples.length === 0)
                        return

                    const gap = 1
                    const barWidth =
                        (width - (samples.length - 1) * gap) /
                        samples.length

                    cr.setSourceRGB(1, 1, 1)

                    for (let i = 0; i < samples.length; i++) {

                        const h = Math.max(
                            2,
                            samples[i] * height,
                        )

                        const x = i * (barWidth + gap)

                        const y = (height - h) / 2

                        cr.rectangle(
                            x,
                            y,
                            barWidth,
                            h,
                        )
                    }

                    cr.fill()
                })
            }}
        />
    )
}