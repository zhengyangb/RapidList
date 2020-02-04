import React, {Component} from 'react';
import classes from './Calendar.module.css';
import moment from "moment";

class Calendar extends Component {
    state={
        viewMonth: null,
        isViewMonthThisMonth: false,
    };

    componentDidMount() {
        this.setState({
            viewMonth: this.props.dateSelected === null ? moment() : this.props.dateSelected.clone(),
            isViewMonthThisMonth: this.props.dateSelected === null ? true : this.props.dateSelected.clone().startOf('month').isSame(moment().startOf('month'))
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    monthAddedHandler = () => {
        this.setState(prevState =>{
            return {
            viewMonth: prevState.viewMonth.clone().add(1,'M'),
            isViewMonthThisMonth: prevState.viewMonth.clone().add(1,'M').startOf('month').isSame(moment().startOf('month'))
        }});
    };

    monthSubtractedHandler = () => {
        this.setState(prevState =>({
            viewMonth: prevState.viewMonth.clone().subtract(1,'M'),
            isViewMonthThisMonth: prevState.viewMonth.clone().subtract(1,'M').startOf('month').isSame(moment().startOf('month'))
        }));
    };

    backToThisMonthHandler = () => {
        this.setState({
            viewMonth: moment(),
            isViewMonthThisMonth: true
        });
    };

    selectDateAndReturnHandler = (i) => {
        const momentObject = this.state.viewMonth.clone().date(i+1);
        this.props.selectDate(momentObject);
    };

    generateCalendarBody(){
        const calendarBodyRaw = [];
        const firstRowBlanksNum = this.state.viewMonth.clone().startOf('month').day();
        const lastRowBlanksNum = (7 - this.state.viewMonth.clone().add(1, 'month').startOf('month').day()) % 7;
        const numOfDaysInMonth = this.state.viewMonth.clone().add(1, 'month').startOf('month').subtract(1, 'day').date();
        const currentDay = moment().date();
        calendarBodyRaw.push(...[...Array(firstRowBlanksNum)].map((_, i)=>{return <td key={'frontBlanks' + i}> </td>}));
        calendarBodyRaw.push(...[...Array(numOfDaysInMonth)].map((_, i)=>{
            const isToday = this.state.isViewMonthThisMonth && i+1 === currentDay;
            const isSelected = this.state.viewMonth.isSame(this.props.dateSelected, 'month') && this.props.dateSelected.date() === i+1;
            return (
                <td
                    key={'day' + i}
                    className={isToday ? classes.todayTd : null }
                    onClick={() => {this.selectDateAndReturnHandler(i)}}
                >
                    <div className={[classes.circleTd, isSelected ? classes.circleSelect : null].join(' ')}>{i+1}</div>

                </td>
            )
        }));
        calendarBodyRaw.push(...[...Array(lastRowBlanksNum)].map((_, i)=>{return <td key={'endBlanks' + i}></td>}));
        const numOfRows = (firstRowBlanksNum + lastRowBlanksNum + numOfDaysInMonth) / 7;
        const res = [...Array(numOfRows)].map((_, i)=>{return (
            <tr key={'row' + i}>
                {calendarBodyRaw.slice(i * 7, (i+1) * 7)}
            </tr>
        )});
        return res;
    }

    render() {
        const calendarBody = this.state.viewMonth ? this.generateCalendarBody() : null;

        const calendarTable = (
            <table className={classes.CalTab}>
                <thead>
                    <tr>
                        <td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td>
                    </tr>
                </thead>
                <tbody>
                    {calendarBody}
                </tbody>
            </table>
        );

        return (
            <div className={classes.Calendar}>
                <div className={classes.CalHeader}>
                    <div onClick={this.monthSubtractedHandler}>◀</div>
                    <div>{this.state.viewMonth ? this.state.viewMonth.format('MMMM YYYY') : null}</div>
                    <div onClick={this.monthAddedHandler}>▶</div>
                </div>
                {calendarTable}
                <div>
                    <button
                        className={classes.buttonLong}
                        disabled={this.state.isViewMonthThisMonth}
                        onClick={this.backToThisMonthHandler}>Go to current month</button>
                </div>
                <div>
                    <button
                        className={classes.buttonLong}
                        onClick={this.props.toggleCal}>Cancel</button>
                </div>
                <div>
                    <button
                        className={[classes.buttonLong, classes.buttonWarning].join(' ')}
                        disabled={this.props.dateSelected === null}
                        onClick={this.props.removeDueDate}>Remove due date</button>
                </div>
            </div>
        );
    }
}

export default Calendar;