<template>
  <div class="full-width">
    <a-spin :spinning="loading">
      <a-row
        type="flex"
        :gutter="24"
        align="stretch"
        style="margin-bottom: 20px"
        class="dashboard-statistics-container"
      >
        <a-col :span="8">
          <a-card class="rounded">
            <a-statistic
              title="Approved Loans"
              :value-style="{ fontWeight: 'bold' }"
              :value="approvedLoans"
            />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="rounded">
            <a-statistic
              title="Approved Loans Value"
              :precision="2"
              prefix="KShs. "
              :value-style="{ fontWeight: 'bold' }"
              :value="approvedLoansValue"
            />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="rounded">
            <a-statistic
              title="Most Popular Loan Product"
              :value-style="{ fontWeight: 'bold' }"
              :value="mostPopularLoanProduct"
            />
          </a-card>
        </a-col>
      </a-row>
      <a-row type="flex" align="stretch" :gutter="24">
        <a-col :span="8">
          <a-card class="widgetCard">
            <a-typography-text class="widgetTitle">
              Number of Loans by Status
            </a-typography-text>
            <highcharts
              :key="statusCountSeries.value"
              :options="leadsBySourceSeries"
            />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="widgetCard">
            <a-typography-text class="widgetTitle">
              Loan value by Status
            </a-typography-text>
            <highcharts
              :key="statusValueSeries.value"
              :options="valueByStateBar"
            />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card class="widgetCard">
            <a-typography-text class="widgetTitle">
              Loan Products Value
            </a-typography-text>
            <highcharts
              :key="loanProductSeries.value"
              :options="loanProductBar"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script lang="ts">
import useDashboard from "@/composables/useDashboard";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const {
      fetchLoanProductStats,
      fetchLoansByStatus,
      loanProductSeries,
      statusCountSeries,
      statusValueSeries,
      approvedLoans,
      approvedLoansValue,
      mostPopularLoanProduct,
    } = useDashboard();

    const loading = ref<boolean>(true);

    const categories = statusValueSeries.value.map((i) =>
      i.name.replace("_", " ")
    );
    const loanProducts = loanProductSeries.value.map((i) => i.name);

    const leadsBySourceSeries = {
      chart: {
        type: "pie",
        height: "350px",
        style: {
          fontFamily: "Open Sans",
        },
      },
      title: {
        // text: "Loans by Status",
        text: null,
      },
      loading: loading,
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
          name: "Loans",
          colorByPoint: true,
          data: statusCountSeries.value,
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
        style: {
          fontFamily: "Open Sans",
        },
      },

      title: {
        // text: "Loan value by Status",
        text: null,
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
        pointFormat: "{series.name}: <b>Ksh. {point.y:,.2f}</b> <br>",
        shared: true,
      },

      series: [
        {
          name: "Value",
          data: statusValueSeries.value,
        },
      ],
    };

    const loanProductBar = {
      chart: {
        type: "bar",
        height: "350px",
        style: {
          fontFamily: "Open Sans",
        },
      },

      title: {
        // text: "Loan Products Value",
        text: null,
      },

      credits: {
        enabled: false,
      },

      colors: ["#3B90D3", "#1E3D73"],

      xAxis: {
        categories: loanProducts,
      },

      yAxis: {
        allowDecimals: false,
      },

      tooltip: {
        pointFormat: "{series.name}: <b>Ksh. {point.y:,.2f}</b> <br>",
        shared: true,
      },

      series: [
        {
          name: "Value",
          data: loanProductSeries.value,
        },
      ],
    };

    onMounted(async () => {
      loading.value = true;
      try {
        await fetchLoanProductStats();
        await fetchLoansByStatus();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    });

    return {
      valueByStateBar,
      leadsBySourceSeries,
      loanProductBar,
      loanProducts,
      loanProductSeries,
      statusCountSeries,
      statusValueSeries,
      approvedLoans,
      approvedLoansValue,
      mostPopularLoanProduct,
      loading,
    };
  },
});
</script>

<style scoped>
.widgetTitle {
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #363636;
  text-align: center;
}

.widgetCard {
  width: 100%;
  padding: 0px;
  border-radius: 12px;
}

.rounded {
  border-radius: 12px;
}
</style>
