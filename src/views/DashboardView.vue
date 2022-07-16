<template>
  <div class="full-width">
    <a-row type="flex" align="stretch" :gutter="24">
      <a-col :span="8">
        <a-card style="width: 100%; padding: 0px; border-radius: 20px">
          <highcharts :options="leadsBySourceSeries" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card style="width: 100%; padding: 0px; border-radius: 20px">
          <highcharts :options="valueByStateBar" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card style="width: 100%; padding: 0px; border-radius: 20px">
          <highcharts :options="loanProductBar" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { capitalize, computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const items = {
      count_of_applications: 4,
      value_of_applications: 400,
      count_of_disbursed: 0,
      value_of_disbursed: 0,
      count_of_approved: 1,
      value_of_approved: 100,
      count_of_pending: 3,
      value_of_pending: 300,
      count_of_rejected: 0,
      value_of_rejected: 0,
      count_of_defaults: 0,
      value_of_defaults: 0,
      count_of_written_off: 0,
      value_of_written_off: 0,
      count_of_fully_paid: 0,
      value_of_fully_paid: 0,
      count_of_due: 0,
      value_of_due: 0,
    };

    const loanProductStats = [
      {
        id: 1961,
        name: "Dairy Loan",
        total_requested_amount: 1400,
        total_requests: 5,
      },
      {
        id: 317661,
        name: "sadsadsa",
        total_requested_amount: 0,
        total_requests: 0,
      },
      {
        id: 317718,
        name: "ss",
        total_requested_amount: 0,
        total_requests: 0,
      },
    ];
    const series = computed(() => {
      return Object.entries(items)
        .filter((i) => i[0].startsWith("count"))
        .map((i) => ({
          name: capitalize(i[0].replace("count_of_", "").replace("_", " ")),
          y: i[1],
        }));
    });
    const valueSeries = computed(() => {
      return Object.entries(items)
        .filter((i) => i[0].startsWith("value"))
        .map((i) => ({
          name: capitalize(i[0].replace("value_of_", "").replace("_", " ")),
          y: i[1],
        }));
    });
    const loanProductSeries = computed(() => {
      return loanProductStats.map((i) => ({
        name: capitalize(i.name),
        y: i.total_requested_amount,
      }));
    });
    const categories = valueSeries.value.map((i) => i.name.replace("_", " "));
    // const categories = valueSeries.value.map((i) => i.y);
    const leadsBySourceSeries = {
      chart: {
        type: "pie",
        height: "350px",
      },
      title: {
        text: "Loans by Status",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Loans Status",
          colorByPoint: true,
          data: series.value,
        },
      ],
      credits: {
        enabled: false,
      },
    };

    const valueByStateBar = {
      chart: {
        type: "bar",
        height: "350px",
      },

      title: {
        text: "Loan value by Status",
      },

      credits: {
        enabled: false,
      },

      colors: ["#3B90D3", "#1E3D73"],

      xAxis: {
        categories,
      },

      yAxis: {
        allowDecimals: false,
      },

      tooltip: {
        pointFormat: "{series.name}: <b>$ {point.y:,.2f}</b> <br>",
        shared: true,
      },

      series: [
        {
          name: "Value",
          data: valueSeries.value,
        },
      ],
    };

    const loanProductBar = {
      chart: {
        type: "bar",
        height: "350px",
      },

      title: {
        text: "Loan Products Value",
      },

      credits: {
        enabled: false,
      },

      colors: ["#3B90D3", "#1E3D73"],

      xAxis: {
        categories,
      },

      yAxis: {
        allowDecimals: false,
      },

      tooltip: {
        pointFormat: "{series.name}: <b>$ {point.y:,.2f}</b> <br>",
        shared: true,
      },

      series: [
        {
          name: "Value",
          data: loanProductSeries.value,
        },
      ],
    };

    return {
      valueByStateBar,
      leadsBySourceSeries,
      loanProductBar,
    };
  },
});
</script>
