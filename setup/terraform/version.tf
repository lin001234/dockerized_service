terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.31.0"
    }
  }
}

provider "azurerm" {
  # Configuration options
  features {}
  
  subscription_id= "127e8745-23ee-467b-a19e-3f41451ff838"
}