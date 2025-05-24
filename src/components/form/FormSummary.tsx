import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Printer, Edit, ArrowLeft } from "lucide-react";
import Button from "../ui/Button";
import { useLocation } from "react-router-dom";
import {
  formatPhoneNumber,
  downloadFile,
  convertToCSV,
  generatePDFContent,
} from "../../utils/helpers";

const FormSummary: React.FC = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const navigate = useNavigate();


  useEffect(() => {
    console.log(formData);
  });

  const handleBackToForm = () => {
    navigate("/");
  };

  const handleDownloadPDF = () => {
    const pdfContent = generatePDFContent(formData);
    downloadFile(pdfContent, "user-form-data.txt", "text/plain");
  };

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(formData);
    downloadFile(csvContent, "user-form-data.csv", "text/csv");
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = () => {
    return new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Registration Summary
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Submitted on {formatDate()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleBackToForm}>
                  <ArrowLeft size={16} />
                  <span>Back to Form</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="print:hidden"
                >
                  <Printer size={16} />
                  <span>Print</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="print:hidden"
                >
                  <Download size={16} />
                  <span>Text</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadCSV}
                  className="print:hidden"
                >
                  <Download size={16} />
                  <span>CSV</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                    Personal Information
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Full Name
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Username
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                    Contact Information
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Email Address
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Phone Number
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.countryCode}{" "}
                        {formatPhoneNumber(formData.phoneNumber)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Location
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.city}, {formData.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                    Identity Information
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        PAN Number
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.panNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Aadhar Number
                      </p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {formData.aadharNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Registration Complete
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Thank you for completing your registration. Your information
                    has been successfully submitted. You can print or download
                    this summary for your records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSummary;
