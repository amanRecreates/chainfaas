import { CanvasJSChart } from 'canvasjs-react-charts'
import { PureComponent } from 'react';
var React = require('react');
var updateInterval = 500;


let datapoints = [
    { label: "Core 1", y: 1 },
    { label: "Core 2", y: 1 },
    { label: "Core 3", y: 1 },
    { label: "Core 4", y: 1 }
]

let id = null;

class Chart extends PureComponent {
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
    }

    componentWillUnmount() {
        clearInterval(id)
    }

    componentDidMount() {
        id = setInterval(this.updateChart, updateInterval);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.isHigh !== this.props.isHigh) {
            return true;
        } else {
            return false;
        }
    }

    checkcores() {
        let tmp = []
        if(this.props.isHigh === true) {
            for(let i=1; i<=this.props.cores; i++) {
                let obj = {
                    label: `Core ${i}`,
                    y: 1
                }
                tmp.push(obj)
            }
        } else {
            for(let i=1; i<=this.props.cores; i++) {
                let obj = {
                    label: `Core ${i}`,
                    y: 85
                }
                tmp.push(obj)
            }
        }
        datapoints = tmp;
    }

    updateChart() {
        this.checkcores()
        var dpsColor, dpsTotal = 0, deltaY, yVal;
        var dps = this.chart.options.data[0].dataPoints;
        var chart = this.chart;
        for (var i = 0; i < dps.length; i++) {
            deltaY = Math.round(2 + Math.random() * (-2 - 2));
            yVal = deltaY + dps[i].y > 0 ? (deltaY + dps[i].y < 100 ? dps[i].y + deltaY : 100) : 0;
            dpsColor = yVal >= 90 ? "#e40000" : yVal >= 70 ? "#ec7426" : yVal >= 50 ? "#81c2ea" : "#88df86 ";
            dps[i] = { label: "Core " + (i + 1), y: yVal, color: dpsColor };
            dpsTotal += yVal;
        }
        chart.options.data[0].dataPoints = dps;
        chart.options.title.text = "CPU Usage " + Math.round(dpsTotal / this.props.cores) + "%";
        chart.render();
    }
    render() {
        const options = {
            theme: "light",
            title: {
                text: "CPU Usage"
            },
            subtitles: [{
                text: "Intel(R) Core(TM) i5-8300H CPU @ 2.30GHz"
            }],
            axisY: {
                title: "CPU Usage (%)",
                includeZero: true,
                suffix: "%",
                maximum: 100
            },
            data: [{
                type: "column",
                yValueFormatString: "#,###'%'",
                indexLabel: "{y}",
                dataPoints: datapoints
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default Chart;